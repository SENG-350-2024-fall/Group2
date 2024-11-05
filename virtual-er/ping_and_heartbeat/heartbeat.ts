class Heartbeat {
    static instance: Heartbeat;
    intervalID: NodeJS.Timeout | null = null;

    constructor() {}

    static getInstance(): Heartbeat {
        if (!this.instance) {
            this.instance = new Heartbeat();
        }
        return this.instance;

    }

    startHeartbeat(checkFunction: () => void, interval:number): void {
        if (this.intervalID) {
            console.log("Heartbeating.");
            return;
        }
        this .intervalID = setInterval(() => { checkFunction(); }, interval);
        console.log('Heartbeating...');
    }

    stopHeartbeat(): void {
        if(this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
            console.log("Heartbeat off");
        } else {
            return;
        }
    }
}

export default Heartbeat;