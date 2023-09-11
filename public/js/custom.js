$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

$(document).ready(function () {
    $(".listclick").click(function () {
        $("#chat-container").html("");
        var getUserId = $(this).attr("data-id");
        receiver_id = getUserId;
        $(".start-head").hide();
        $(".chat-section").show();
        var getUserName = $(this).attr("user-name");
        $(".click-people-name").html(getUserName);
       
        loadChat();
    });
    //chat store

    $("#form-id").submit(function (e) {
        e.preventDefault();

        var message = $("#message").val();
        $.ajax({
            url: "/save-chat",
            method: "post",
            data: {
                sender_id: sender_id,
                receiver_id: receiver_id,
                message: message,
            },
            success: function (response) {
                console.log(response);
                window.scrollTo(0, document.body.scrollHeight);
                if (response.success) {
                    $("#message").val("");
                    let html = ` <div class="current-user-chat" id=${response.data.id}-chat >
                               
                               <h5><span id=${response.data.id}>${response.data.message}</span>
                               <i class="fa-solid fa-trash fa-sm delete-record"  data-id='${response.data.id}'></i>
                               </h5>
                              
                            </div>`;
                    $("#chat-container").append(html);
                    scrollChat();
                } else {
                    alert(response.msg);
                }
            },
        });
    });

Echo.join("status-update")
    .here((users) => {
        for (let x = 0; x < users.length; x++) {
            if (sender_id != users[x]["id"]) {
                $("#" + users[x].id + "-status").removeClass("offline-status");
                $("#" + users[x].id + "-status").addClass("online-status");
                $("#" + users[x].id + "-status").text("Online");
            }
        }
    })
    .joining((users) => {
        $("#" + users.id + "-status").removeClass("offline-status");
        $("#" + users.id + "-status").addClass("online-status");
        $("#" + users.id + "-status").text("Online");
    })
    .leaving((users) => {
        $("#" + users.id + "-status").removeClass("online-status");
        $("#" + users.id + "-status").addClass("offline-status");
        $("#" + users.id + "-status").text("Offline");
    })
    .listen("UserStatusEvent", (e) => {
        // console.log(e);
    });
 
Echo.private("broadcast-message").listen(".getChatMessage", (data) => {
    
   
   
    
    
    if (
        sender_id == data.chat.receiver_id &&
        receiver_id == data.chat.sender_id
    ) {
        let html = ` <div class="distance-user-chat" id=${data.chat.id}-chat  > 
       <h5><span   id=${data.chat.id}>${data.chat.message}</span>
       <i class="fa-solid fa-trash fa-sm delete-record" data-id='${data.chat.id}'></i>
        </h5>
            </div>`;
        $("#chat-container").append(html);
        scrollChat();
      
    }
   
    
});

//loadChat

function loadChat() {
    $.ajax({
        url: "/get-chat",
        method: "post",
        data: { sender_id: sender_id, receiver_id: receiver_id },
        success: function (res) {
           

            if (res.success) {
                let chatdata = res.data;
                let html = "";
                for (let i = 0; i < chatdata.length; i++) {
                    var AddClass = "";
                    var ButtonClass = "";
                    if (chatdata[i].sender_id == sender_id) {
                        AddClass = "current-user-chat";
                        ButtonClass = "bg-success";
                    } else {
                        AddClass = "distance-user-chat";
                        ButtonClass = "bg-black";
                    }
                    html += ` <div class="${AddClass}" id=${chatdata[i].id}-chat >
                <h5><span   id=${chatdata[i].id}>${chatdata[i].message}</span>`;
                if (chatdata[i].sender_id == sender_id) {
                    html += `<i class="fa-solid fa-trash fa-sm delete-record"  data-id='${chatdata[i].id}'></i>`;
                   
                } 
               html += `</h5>
                    </div>`;
                }
                $("#chat-container").append(html);
                scrollChat();
            } else {
                alert(res.msg);
            }
        },
    });
}

// scroll chat

function scrollChat() {
    $("#chat-container").animate({
        scrollTop:
            $("#chat-container").offset().top +
            $("#chat-container")[0].scrollHeight,
    },0);
}
$(document).on('click','.delete-record',function(evt){
    var dataId=$(this).attr('data-id');
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url:`delete-chat`,
                data:{id:dataId},
                method:'post',
                success:function(res){
                    // console.log(res);
                    $(`#${dataId}-chat`).remove();
                    // loadChat();
                    Swal.fire({
                        icon: res.status ? "success" : "error",
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
         
        }
      })
})
});

// $(document).on("dblclick", function(evt) {
//     console.log(evt);
    // var original_text = $(this).text();
    // var new_input = $("<input class=\"text_editor\"/>");
    // new_input.val(original_text);
    // $(this).replaceWith(new_input);
    // new_input.focus();
//   });

// function ChatData(id){
//   $(`#${id}`).attr('contentEditable',true);
//   var updatedData= $(`#${id}`).text();
//   console.log(updatedData);
   
// }
