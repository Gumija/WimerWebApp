export class Highlight {

    public auto: boolean;
    public hover: boolean;

    constructor(
        public id: number,
        public R: number,
        public G: number,
        public B: number,
        public A: number,
    ) { }

    getStyle(): any{
        let backgroundColor: string;
        let borderColor: string;
        let borderWidth: number;
        borderColor = `rgba(${this.R},${this.G},${this.B},1`;
        backgroundColor = `rgba(${this.R},${this.G},${this.B},${this.A})`;
        borderWidth = 1;      
        if(this.hover){
            backgroundColor = `rgba(${this.R},${this.G},${this.B},${this.A*3/2})`;
        }
        if(this.auto){
            borderWidth = 7;
        }
        return {
            "backgroundColor": backgroundColor,
            "borderColor": borderColor,
            "borderWidth": borderWidth,
        }
    }
    getColor(): string{
        return `rgba(${this.R},${this.G},${this.B},${this.A})`;
    }
}