const timetable = {
    _schedules: [null,null,null,null,null,null,null,null,null,null],
    _onCnt:0,
    _openSchedule: undefined,
    addSchedule(schedule) {
        for (let pos = 0 ; pos < this._schedules.length; pos++){
            if (this._schedules[pos] !== null) continue;
      
            schedule['memo'] = []
            schedule['idx'] = pos + 1;
            this._schedules[pos] = schedule
            this._onCnt++;
            return pos + 1;
        }
    },
    isAddable(lecture) {
        if (this._onCnt == 9) return 'MAX';

        for (const schedule of this._schedules) {
            if (schedule === null) continue;
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
                        return 'ALREADY';
                }
            }
        }
        return 'OK';
    },
    setScheduleMemo(title, content) {
        this._openSchedule.memo.push({ title, content })
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
    },
    removeMemo(idx) {
        this._openSchedule.memo.splice(idx, 1)
    },
    removeSchedule(idx){
        this._onCnt--;
        this._schedules[idx] = null
    }
}

export default timetable