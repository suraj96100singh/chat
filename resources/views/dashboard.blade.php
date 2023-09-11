<x-app-layout>
  
    <div class="container mt-4" >
     <div class="row">
        @if(count($user)>0)
        <div class="col-md-3">
            <ul class="list-group" style="border-radius: 50px">
              <li class="list-group-item">Contacts
                <button class="btn btn-primary ml-5" title="Add Group" style="border-radius: 100px; margin-left: 160px">+</button>
              </li>
                @foreach ($user as $users)
               @php
               if($users->image!='' && $users->image!=null){
                $image=$users->image;
               }else{
                $image='dummy.png';
               }
               @endphp
                <li class="list-group-item list-group-item-dark cursor listclick text-capitalize" data-id="{{$users->id}}" user-name="{{$users->name}}">
                    <img src="{{asset('storage/uploads/'.$image)}}" alt="" class="user-image" style="border-radius: 100px">
                    {{$users->name}}
                    <b><sup class="offline-status" id="{{$users->id}}-status">offline</sup></b>
                    {{-- <button class="btn btn-secondary" style="border-radius: 100px;">3</button> --}}
                </li>
              
                @endforeach
                
            </ul>
        </div>
        <div class="col-md-9">
            <h1 class="start-head">Click to start Chat</h1>
            <div class="chat-section">
                <div class="card-header click-people-name" style="border-radius: 10px"></div>
                <div id="chat-container">
                   
                    
                </div>
                <form action="" id="form-id" method="POST">
                    <div class="input-group">
                        <input type="text"  class="form-control border" name="chat_message" required placeholder="Enter Message" id="message"  autocomplete="off" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-primary">send</button>   
                        </div>
                        
                    </div>
                  
                  
                </form>

            </div>
        </div>
        @else
        <div class="col-md-12">
            <h6>Users not Found</h6>

        </div>
        @endif
     </div>
    </div>
{{-- delete model --}}
      <!-- Modal -->
      {{-- <div class="modal fade" id="deleteChatModel" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Modal 1</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Show a second modal and hide this one with the button below.
            </div>
           
          </div>
        </div>
      </div> --}}
      
</x-app-layout>
