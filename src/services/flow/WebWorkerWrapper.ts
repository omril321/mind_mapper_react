export default class WebWorkerWrapper<InputType, OutputType> {
    protected worker: Worker;

    public constructor(worker: Worker) {
        this.worker = worker;
    }

    public startWebWorker(input: InputType, callback: (result: OutputType) => void) {
        this.worker.onmessage = (result) => callback(result.data);
        this.worker.postMessage(input);
    }
}
