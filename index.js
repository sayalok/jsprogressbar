const uploadForm  = document.getElementById("uploadForm") 
const inpFile     = document.getElementById('inpFile')
const progressbar = document.getElementById('progress-bar')
const progress = document.getElementById('progress')

/***

		Pure javascript 

***/


// uploadForm.addEventListener("submit", uploadFile)

// function uploadFile(e) {
//   e.preventDefault();

//   const xhr = new XMLHttpRequest();
//   xhr.open('POST','upload.php')
//   xhr.upload.addEventListener("progress", e => {
//     const percent = (e.loaded / e.total) * 100
//     progressbar.innerHTML = percent.toFixed(2) + '%'
//     progressbar.style.width = percent + '%'
//     console.log(e.loaded)
//   })

//   xhr.setRequestHeader('Content-type','multipart/form-data');
//   xhr.send(new FormData(uploadForm))
// }


/***

		using jQuery 

***/

$('#uploadForm').submit(function (e) {
	e.preventDefault();
	$.ajax({
		xhr: function() {
		    var xhr = new window.XMLHttpRequest();
			xhr.upload.addEventListener("progress", function(evt) {
				if (evt.lengthComputable) {
					progress.style.display = ''
					var percent = evt.loaded / evt.total;
			        percent = parseInt(percent * 100);
			        progressbar.innerHTML = percent.toFixed(2) + '%'
		     		progressbar.style.width = percent + '%'
		     		console.log(percent)
				}
		    }, false);
		    return xhr;
	  	},
		url: 'upload.php',
		method: 'post',
		processData: false,
		contentType: false,
		cache: false,
		enctype: 'multipart/form-data',
		type: "POST",
		data: new FormData(this),
		dataType: "json",
		success: function(result) {
		    console.log(result);
		}
	});
})