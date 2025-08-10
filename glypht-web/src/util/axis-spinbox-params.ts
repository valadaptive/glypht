const axisSpinboxParams = (axisMax: number) => {
    const step = axisMax >= 200 ?
        1 :
        axisMax > 1.0 ?
            0.25 :
            0.01;
    const smartAim = axisMax >= 200 ?
        25 :
        axisMax >= 50 ?
            12.5 :
            0;
    return {step, smartAim};
};

export default axisSpinboxParams;
