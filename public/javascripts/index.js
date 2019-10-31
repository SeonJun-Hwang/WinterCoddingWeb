import renders from './renders.js'
import lectures from './models/lectures.js'
import timetable from './models/timetable.js'

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
  
// $('.timeline-vertical > ul').click(event => {
//     let target = $(event.target)
//     if (target.get(0).tagName == 'UL') return;
//     target = target.closest('.lecture-time')
//     const dataEvent = target.data('event')
//     const idx = dataEvent.replace(/[^0-9]/g,'')
//     renders.scheduleInfo(timetable.getSchedule(idx - 1))

//     $('#modal-lecture-task').modal('show');
// });
  
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
    $('.list-lecture').html(renders.searchList(searchResult))
})

$('#regist-lecture').click(event => {
    const number = timetable.addSchedule(lectures.getOpenLecture())
    renders.addSchedule(lectures.getOpenLecture(), number)

    $('#modal-lecture-info').modal('hide');
})

window.onload = () => {
    const today = new Date().getDay()
    if (0 < today && today < 6){
        $(`.list-lecture-item`).children(`:eq(${today - 1})`).children(`:first`).addClass('today')
    }
    
}