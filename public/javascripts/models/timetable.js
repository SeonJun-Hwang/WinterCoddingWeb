const timetable = {
    _schedules: [],
    _openSchedule: undefined,
    addSchedule(schedule) {
        this._schedules.push({schedule, memo: []})

        return this._schedules.length
    },
    isAddable(schedules) {

    },
    setScheduleMemo(title, content){
        this._openSchedule.schedule.memo.push({title, content})
    },
    setOpenSchedule(idx){
        this._openSchedule = {idx, schedule: this._schedules[idx]}
    },
    getOpenSchedule(){
        return this._openSchedule
    },
    getOpenScheduleIdx(){
        return this._openSchedule.idx
    },
    getSchedule(idx){
        return this._schedules[idx]
    }
}

export default timetable