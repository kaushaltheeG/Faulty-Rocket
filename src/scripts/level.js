

export default class Level {
    constructor(state, ctx) {
        
        this.state = state;
        this.ctx = ctx;
        this.passingSpeed; 
        this.renderLevel(this.state);
    }

    renderLevel(state) {
        // console.log('in level')
        // ground:0, troposphere:1, stratosphere:2, mesosphere:3, thermosphere:4 and exosphere:5 goal(will be rendered to show user has won)
        const canvas = document.getElementById("rocket-canvas")
        canvas.className = ""
        switch(state) {
            case 0: 
                canvas.className = 'level-zero'
                // this.passingSpeed = 20; 
                break;
            case 1: 
                canvas.className = 'level-one'
                break;
            case 2: 
                canvas.className = 'level-two'
                break;
            case 3:
                canvas.className = 'level-three'
                break;
            case 4: 
                canvas.className = 'level-four'
                break;
            case 5:
                canvas.className = 'level-five'
                break;
        }
        // console.log(canvas)

    }




}