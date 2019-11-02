const timetable = {
    _schedules: [],
    _openSchedule: undefined,
    addSchedule(schedule) {
        schedule['memo'] = []
        schedule['idx'] = this._schedules.length + 1;
        this._schedules.push(schedule)

        return this._schedules.length
    },
    isAddable(lecture) {

        for (const schedule of this._schedules) {
            const { start_time, end_time, dayofweek } = schedule

            // 요일을 하루 단위로 체크
            for (const day of lecture.dayofweek) {
                // For es5 
                if (dayofweek.indexOf(day) !== -1) {
                    const startInt = parseInt(start_time)
                    const endInt = parseInt(end_time)
                    const lecStartInt = parseInt(lecture.start_time)
                    const lecEndInt = parseInt(lecture.end_time)
                    if ((startInt <= lecStartInt && lecStartInt < endInt) ||
                        (startInt < lecEndInt && lecEndInt <= endInt))
                        return false;
                }
            }
        }
        return true;
    },
    setScheduleMemo(title, content) {
        this._openSchedule.schedule.memo.push({ title, content })
    },
    setOpenSchedule(idx) {
        this._openSchedule = this._schedules[idx] 
    },
    getOpenSchedule() {
        return this._openSchedule
    },
    getOpenScheduleIdx() {
        return this._openSchedule.idx
    },
    getSchedule(idx) {
        return this._schedules[idx]
    }
}

export default timetable