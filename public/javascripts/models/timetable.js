const timetable = {
    schedules: [],
    addSchedule(schdule) {
        this.schedules.push(schdule)

        return this.schedules.length
    },
    isAddable(schedules) {

    },
    getSchedule(idx){
        return this.schedules[idx]
    }
}

export default timetable