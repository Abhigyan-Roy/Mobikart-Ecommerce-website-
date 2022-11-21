let star = document.querySelectorAll('input');
let showValue = document.querySelector('#rating-value');
let starCount=document.querySelector('#starcount');
let textArea=document.querySelector('#textarea');
let i;
for (i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function(e) {
		i = this.value;
		showValue.innerHTML = i + " out of 5";
		starCount.value=i;
	});
}
