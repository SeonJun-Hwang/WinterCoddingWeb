import renders from './renders.js'
import lectures from './models/lectures.js'
import timetable from './models/timetable.js'
import validator from '../utils/validator.js'

$('.list-lecture').click(event => {
    let target = event.target
    if (target.classList.contains('list-lecture')) return;

    while (!target.classList.contains('card-lecture'))
        target = target.parentElement

    const idx = $('.list-lecture').children().index(target)
    lectures.setOpenLecture(idx)
    renders.lectureInfo(lectures.getDataOfIdx(idx))

    $('#modal-lecture-info').modal('show');
});
  
$('.timeline-vertical > ul').click(event => {
    let target = $(event.target)
    if (target.get(0).tagName == 'UL') return;
    target = target.closest('.lecture-time')
    const dataEvent = target.data('event')
    const idx = dataEvent.replace(/[^0-9]/g,'')
    timetable.setOpenSchedule(idx - 1)
    renders.scheduleInfo(timetable.getOpenSchedule())

    $('#modal-lecture-task').modal('show');
});
  
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
  
$(function () {
    $('[data-toggle="popover"]').popover({
      container: 'body',
      html: true,
      placement: 'right',
      sanitize: false,
      content: function () {
      return $("#PopoverContent").html();
      }
    });
  });

$('#search-form > .form-control').keyup(async event => {
    const value = event.target.value
    const searchResult = await lectures.searchLecture(value)
    renders.searchList(searchResult)
})

$('#regist-lecture').click(event => {
    if (timetable.isAddable(lectures.getOpenLecture())){
        const number = timetable.addSchedule(lectures.getOpenLecture())
        renders.addSchedule(lectures.getOpenLecture(), number)
        alert('추가 되었습니다.')
        $('#modal-lecture-info').modal('hide');
    }
    else{
        alert('해당 시간에 다른 과목이 존재합니다.')
    }
})

$(document.body).on('click','.btn-save' ,event =>{
    const inputs = $('.popover-body').find('.form-control')
    const titleEl = inputs[0]
    const contentEl = inputs[1]
    const title = titleEl.value
    const content = contentEl.value

    if (!validator.StringIsEmpty(title) && !validator.StringIsEmpty(content)){
        timetable.setScheduleMemo(title, content)
        const idx = timetable.getOpenScheduleIdx()
        renders.memoOnTimeTable(idx, title, content)
        renders.memoOnModal(title, content)
        alert('메모가 추가 되었습니다.')
    }
    else {
        alert('제목 또는 내용에 빈 값이 존재합니다.')
    }
})

$(document.body).on('click','.memo-btn' , event =>{
    event.preventDefault()

    const li = $(event.target).closest('li')[0]
    const ul = $(event.target).closest('ul')
    const idx = ul.children().index(li)

    timetable.removeMemo(idx)
    renders.removeMemo(timetable.getOpenScheduleIdx(), idx)
    ul.children().eq(idx).remove();
})

window.onload = () => {
    const today = new Date().getDay()
    if (0 < today && today < 6){
        $(`.list-lecture-item`).children(`:eq(${today - 1})`).children(`:first`).addClass('today')
    }
}