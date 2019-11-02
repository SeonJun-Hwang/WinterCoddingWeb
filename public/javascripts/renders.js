import { _$, _$l, _chd } from '../utils/domUtil.js'

/**
 * 
 * @param {Array} result 
 */
export const searchList = (result) => {
    const list = result.reduce((pre, cur) => {
        const { code, lecture, professor, location, start_time, end_time, dayofweek } = cur
        return pre + `<li class="card-lecture">${_lecture.title(lecture)}${_lecture.time(start_time, end_time, dayofweek)}${_lecture.info(code, professor, location)}</li>`
    }, '')

    $('.list-lecture').html(list)
}

export const lectureInfo = (data) => {
    const { code, lecture, professor, location, start_time, end_time, dayofweek } = data
    const { startTime, endTime, lectureDay } = _converter.time2Str(start_time, end_time, dayofweek)

    const modal = _$('modal-lecture-info')
    const title = modal.querySelector('.lecture-title')
    const modalInfo = _chd(modal.querySelector('.lecture-info'))
    const timeInfo = modalInfo[0].querySelector('span')
    const codeInfo = modalInfo[1].querySelector('span')
    const profInfo = modalInfo[2].querySelector('span')
    const locaInfo = modalInfo[3].querySelector('span')

    title.innerText = lecture
    timeInfo.innerText = `${startTime} - ${endTime} | ${lectureDay}`
    codeInfo.innerText = `교과목 코드 : ${code}`
    profInfo.innerText = `담당 교수 : ${professor}`
    locaInfo.innerText = `강의실 : ${location}`
}

export const addSchedule = (data, number) => {
    const { lecture, location, start_time, end_time, dayofweek } = data
    const dayCol = []

    for (const ch of dayofweek)
        dayCol.push(_converter.dayofweek2Int(ch))

    const domList = _chd(_$l('.list-lecture-item'))
    dayCol.forEach((col) => {
        const timeList = domList[col].querySelector('ul')
        const [className, lectureNum] = _schedule.classNdataEvent(start_time, end_time, number)
        timeList.insertAdjacentHTML('beforeend', `<li class="${className}" data-event="${lectureNum}"><a href="#"><div class="lecture-info">${_schedule.title(lecture)}${_schedule.location(location)}</div></a></li>`)
    })
}

export const memoOnTimeTable = (idx, title, content) =>{
    const lectureCode = `lecture-${idx < 10 ? `0${idx}` : idx}`
    $(`[data-event="${lectureCode}"] > a`).append(_lecture.memo(title, content))
}

export const memoOnModal = (title, content) => {
    $('.lecture-memo > ul').append(_modal.memo(title, content))
}

export const removeMemo = (lecIdx, memoIdx) => {
    const lectureCode = `lecture-${lecIdx < 10 ? `0${lecIdx}` : lecIdx}`
    const lectures = $(`[data-event="${lectureCode}"] > a`)

    for (const lecture of lectures){
        $(lecture).children('.lecture-noti').eq(memoIdx).remove()
    }
}

export const scheduleInfo = (data) => {
    const { code, lecture, professor, location, start_time, end_time, dayofweek, memo } = data
    const { startTime, endTime, lectureDay } = _converter.time2Str(start_time, end_time, dayofweek)

    const modal = $('#modal-lecture-task')
    const title = modal.find('.lecture-title')
    const modalInfo = modal.find('.lecture-info').children()
    const timeInfo = $(modalInfo[0]).find('span')
    const codeInfo = $(modalInfo[1]).find('span')
    const profInfo = $(modalInfo[2]).find('span')
    const locaInfo = $(modalInfo[3]).find('span')
    const memoList = modalInfo.last().find('ul')

    title.text(lecture)
    timeInfo.text(`${startTime} - ${endTime} | ${lectureDay}`)
    codeInfo.text(`교과목 코드 : ${code}`)
    profInfo.text(`담당 교수 : ${professor}`)
    locaInfo.text(`강의실 : ${location}`)

    memoList.empty();
    for (const item of memo){
        const { title, content } = item
        memoList.append(_schedule.memo(title, content))
    }
}

const _lecture = {
    title(title) {
        return `<a class="lecture-title" href="#">${title}</a>`
    },
    time(start, end, dayofweek) {
        const { startTime, endTime, lectureDay } = _converter.time2Str(start, end, dayofweek)

        return `<h6 class="lecture-time"><i class="material-icons ic-lecture-info">access_time</i><span>${startTime} - ${endTime} | ${lectureDay}</span></h6>`
    },
    info(code, prof, location) {
        return `<ul class="list-lecture-info"><li>교과목 코드 : ${code}</li><li>담당 교수 : ${prof}</li><li>강의실 : ${location}</li></ul>`
    },
    memo(title, content){
        return `<div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="${content}"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">${title}</span></div>`
    }
}

const _schedule = {
    classNdataEvent(startTime, endTime, number) {
        const className = `lecture-time ${endTime - startTime > 1 ? 'two-hr ' : ''}hr-${startTime}`
        const dataEvent = `lecture-${number < 10 ? `0${number}` : number}`

        return [className, dataEvent]
    },
    title(title) {
        return `<h6 class="lecture-title">${title}</h6>`
    },
    location(location) {
        return `<h6 class="lecture-location">${location}</h6>`
    },
    memo(title, content) {
        return `<li class="memo-list"><div class="memo-content" data-toggle="tooltip" data-placement="top" title="" data-original-title="${content}"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">${title}</span></div><div class="memo-btn"><a href=""><i class="material-icons ic-lecture-noti">delete</i></a></div></li>`
    }
}

const _modal = {
    memo(title, content){
        return `<li class="memo-list"><div class="memo-content" data-toggle="tooltip" data-placement="top" title="" data-original-title="${content}"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">${title}</span></div><div class="memo-btn"><a href=""><i class="material-icons ic-lecture-noti">delete</i></a></div></li>`
    }
}

const _converter = {
    time2Str(start, end, dayofweek) {
        const startTime = start < 10 ? `0${start}:00` : `${start}:00`
        const endTime = end - 1 < 10 ? `0${end - 1}:50` : `${end - 1}:50`
        let lectureDay = ''
        for (const pos in dayofweek) {
            lectureDay += `(${dayofweek[pos]})`
            if (pos != dayofweek.length - 1)
                lectureDay += ', ';
        }

        return { startTime, endTime, lectureDay }
    },
    dayofweek2Int(day) {
        const dayWeek = ['월', '화', '수', '목', '금']
        for (const idx in dayWeek)
            if (day === dayWeek[idx]) return idx;
        return -1;
    }
}

export default {
    searchList, lectureInfo, addSchedule, scheduleInfo , memoOnTimeTable, memoOnModal, removeMemo
}