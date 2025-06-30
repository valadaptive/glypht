export const enum NodeType {
    Whitespace,
    DefinitionKeyword,
    OperatorKeyword,
    Keyword,
    PropertyName,
    Paren,
    Brace,
    Punctuation,
    String,
    Number,
    Separator,
}

export const nodeTypeClassNames: Record<NodeType, string | null> = {
    [NodeType.Whitespace]: null,
    [NodeType.DefinitionKeyword]: 'dk',
    [NodeType.OperatorKeyword]: 'ok',
    [NodeType.Keyword]: 'kw',
    [NodeType.PropertyName]: 'pn',
    [NodeType.Paren]: 'p',
    [NodeType.Brace]: 'b',
    [NodeType.Punctuation]: 'pu',
    [NodeType.String]: 's',
    [NodeType.Number]: 'n',
    [NodeType.Separator]: 'se',
};

/**
 * A class to emit indented CSS code with syntax highlighting. Avoids the need for a separate syntax highlighting
 * library.
 */
export default class CSSEmitter {
    private indent = 0;
    private listIndent = 0;
    private indentString = '  ';
    private textLength = 0;

    public spans: {text: string; type: NodeType}[] = [];

    constructor() {}

    private pushSpan(text: string, type: NodeType) {
        if (this.spans.length > 0 && this.spans[this.spans.length - 1].type === type) {
            this.spans[this.spans.length - 1].text += text;
        } else if (text.length > 0) {
            this.spans.push({text, type});
        }
        this.textLength += text.length;
    }

    private pushIndent() {
        this.pushSpan(this.indentString.repeat(this.indent), NodeType.Whitespace);
    }

    private pushSpace() {
        this.pushSpan(' ', NodeType.Whitespace);
    }

    private pushNewline() {
        this.pushSpan('\n', NodeType.Whitespace);
    }

    private pushString(contents: string) {
        const hasDoubleQuotes = contents.includes('"');
        const escaped = hasDoubleQuotes ? contents.replace(/(\\|'|\n)/g, '\\$1') : contents.replace(/(\\|\n)/g, '\\$1');
        this.pushSpan(hasDoubleQuotes ? `'${escaped}'` : `"${escaped}"`, NodeType.String);
    }

    atRule(rule: string) {
        this.pushSpan(rule, NodeType.DefinitionKeyword);
        this.pushSpace();
        this.pushSpan('{', NodeType.Brace);
        this.indent++;
        this.pushNewline();
    }

    endRule() {
        this.indent--;
        this.pushSpan('}', NodeType.Brace);
        this.pushNewline();
        this.pushNewline();
    }

    declaration(property: string) {
        this.pushIndent();
        this.pushSpan(property, NodeType.PropertyName);
        this.pushSpan(':', NodeType.Punctuation);
        this.pushSpace();
    }

    indentedList() {
        this.listIndent++;
        this.indent++;
        this.pushNewline();
        this.pushIndent();
    }

    endIndentedList() {
        this.listIndent--;
        this.indent--;
    }

    endDeclaration() {
        if (this.spans[this.spans.length - 1].type === NodeType.Whitespace) {
            this.spans.pop();
        }
        this.pushSpan(';', NodeType.Separator);
        this.pushNewline();
    }

    keyword(kw: string) {
        this.pushSpan(kw, NodeType.Keyword);
        this.pushSpace();
    }

    number(n: number | string) {
        this.pushSpan(String(n), NodeType.Number);
        this.pushSpace();
    }

    string(s: string) {
        this.pushString(s);
        this.pushSpace();
    }

    parenthesized(callee: string) {
        this.pushSpan(callee, NodeType.OperatorKeyword);
        this.pushSpan('(', NodeType.Paren);
    }

    endParenthesized() {
        if (this.spans[this.spans.length - 1].type === NodeType.Whitespace) {
            this.spans.pop();
        }
        this.pushSpan(')', NodeType.Paren);
        this.pushSpace();
    }

    comma() {
        if (this.spans[this.spans.length - 1].type === NodeType.Whitespace) {
            this.spans.pop();
        }
        this.pushSpan(',', NodeType.Separator);
        if (this.listIndent > 0) {
            this.pushNewline();
            this.pushIndent();
        } else {
            this.pushSpace();
        }
    }

    getString() {
        let finalString = '';
        for (const span of this.spans) {
            finalString += span.text;
        }
        return finalString;
    }

    getNodes() {
        const fragment = new DocumentFragment();

        for (const span of this.spans) {
            const elem = document.createElement('span');
            const className = nodeTypeClassNames[span.type];
            if (className !== null) elem.setAttribute('class', `hl-${className}`);
            elem.append(span.text);
            fragment.appendChild(elem);
        }

        return fragment;
    }
}
