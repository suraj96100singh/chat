<?php

namespace App\Http\Controllers;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Support\Arr;
use App\Events\MessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function UserDashboard(){
        $user=User::whereNotIn('id',[auth()->user()->id])->get();
        
        return view('dashboard',compact('user'));
    }
    public function saveChat(Request $request){

        try {
           $chat = Chat::create([
            'sender_id'=>$request->sender_id,
            'receiver_id'=>$request->receiver_id,
            'message'=>$request->message
           ]);
           event(new MessageEvent($chat));
           return response()->json(['success'=>true,'data'=>$chat]);

        } catch (\Exception $error) {
            return response()->json(['success'=>false,'msg'=>$error->getMessage()]);
           
        }
    }
    public function getChat(Request $request){
        try {
            $chatData=Chat::where(function($query) use ($request) {
                $query->where('sender_id','=',$request->sender_id)
                ->orWhere('sender_id','=',$request->receiver_id);
            })->where(function($query) use ($request) {
                $query->where('receiver_id','=',$request->sender_id)
                ->orWhere('receiver_id','=',$request->receiver_id);
            })->get();
         return response()->json(['success'=>true,'data'=>$chatData]);
        } catch (\Exception $error) {
            return response()->json(['success'=>false,'msg'=>$error->getMessage()]);
        }
    }

    public function deleteChat(Request $request){
        $chatdata=Chat::find(request()->id);
        $chatdata->delete();
        return response()->json(['status'=>true,'msg'=>'Data Deleted Successfully']);
    }





}
