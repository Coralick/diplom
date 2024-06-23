<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Role;
use App\Models\Table;
use App\Models\TaskUser;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $personal = User::all();
        if ($request->user()->role->id == 3) {
            foreach ($personal as $user) {
                $user['role'] = $user->role->name;
            }
            $taskList = false;
            if ($request->user()->task()->exists()) {
                $taskList = $request->user()->task->all();
                foreach ($taskList as $item) {
                    if ($item->pivot->exists && $item->pivot->notification_status != 0) {
                        $item['notion'] = $item->pivot->notification_status;
                    }
                    $item['deadline_string'] = date('d-m-Y', strtotime($item['deadline']));
                }
                usort($taskList, function ($a, $b) {
                    return $a->notion < $b->notion;
                });
            }
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'personal' => $personal,
                'taskList' => $taskList,
            ]);

        } elseif ($request->user()->role->id == 2) {
            $tableList = false;

            if (Table::where('user_id', $request->user()->id)->exists()) {
                $tableList = Table::where('user_id', $request->user()->id)->get();
                foreach ($tableList as $item) {
                    $item['manager'] = $item->user->name;
                    $item['deadline_string'] = date('d-m-Y', strtotime($item['deadline']));
                }
            }

            return Inertia::render('Profile/EditManager', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'tableList' => $tableList,
            ]);

        } else {

            $userList = User::whereNot('id', 1)->get()->all();
            
            usort($userList, function ($a, $b) {
                return strcmp($a->role->name, $b->role->name);
            });

            foreach ($userList as $user) {

                $user['role'] = $user->role->name;
            }

            $roleList = Role::all();
            return Inertia::render('Profile/EditAdmin', [
                'personal' => $userList,
                'roleList' => $roleList,
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        }
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function editRole(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'string|required',
            'role_id' => 'string|required'
        ]);
        $user = User::find($data['user_id']);
        $user['role_id'] = $data['role_id'];
        $user->save();
        return redirect()->route('profile.edit');
    }
}
