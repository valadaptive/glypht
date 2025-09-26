import axesListJson from '../generated/axes.json';
import {AxisProto} from '../generated/google-fonts-types';
const axesList = axesListJson as AxisProto[];
axesList.sort((a, b) => b.popularity - a.popularity);
const axisMetadata = new Map<string, AxisProto>();
for (const axis of axesList) {
    axisMetadata.set(axis.tag, axis);
}

export default axisMetadata;
export {axesList};
