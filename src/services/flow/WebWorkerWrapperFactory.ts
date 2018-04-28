import WebWorkerWrapper from "~/services/flow/WebWorkerWrapper";

export default function generateWorkerWrapper<InputType, OutputType>(worker: Worker): WebWorkerWrapper<InputType, OutputType> {
    return new WebWorkerWrapper<InputType, OutputType>(worker);
}
