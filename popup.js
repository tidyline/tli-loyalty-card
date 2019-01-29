$(document).ready(function () {

	const monthToString = (monthIdx) => [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	][monthIdx];

	// template
	const $holder = $('.calendar-holder');
	const monthTpl = (month, year) => `<div>${month}<div class="year">${year}</div></div>`;

	function getInfo(today) {
		const startOfMonth = dateFns.startOfMonth(today);
		return {
			year: startOfMonth.getFullYear(),
			month: monthToString(startOfMonth.getMonth()),
			day: startOfMonth.getDay(),
			endDate: dateFns.endOfMonth(today).getDate()
		};
	}

	function render(today) {
		const {year, month, day, endDate} = getInfo(today);
		const previousMonth = getInfo(dateFns.addMonths(today, -1));

		const leftDay = (day + endDate > 35 ? 6 : 5) * 7 - (day + endDate);

		$holder.data('timestamp', +today);

		const $previousMonth = [...new Array(day)].map((v, i) => `<li class="prev">${previousMonth.endDate - i}</li>`).reverse();
		const $currentMonth = [...new Array(endDate)].map((v, i) => `<li class="cur">${i + 1}</li>`);
		const $nextMonth = [...new Array(leftDay)].map((v, i) => `<li class="prev">${i + 1}</li>`);

		$holder.find('.current-month').html(monthTpl(month, year));
		$holder.find('.current-days').html([
			...$previousMonth,
			...$currentMonth,
			...$nextMonth
		].join(' '));
	}

	function updateMonth(offset = 0) {
		const current = new Date($holder.data('timestamp'));
		const date = dateFns.addMonths(current, offset);

		render(date);
	}

	$holder.find('.prev').on('click', () => updateMonth(-1));
	$holder.find('.next').on('click', () => updateMonth(1));

	(function init() {
		render(new Date());
	})();

});