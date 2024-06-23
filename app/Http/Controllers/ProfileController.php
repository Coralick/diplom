<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
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
        if($request->user()->role->id == 3){
            foreach($personal as $user){
                $user['role'] = $user->role->name;
            }
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'personal' => $personal,
            ]);
        }
        elseif($request->user()->role->id == 2){
            foreach($personal as $user){
                $user['role'] = $user->role->name;
            }
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'personal' => $personal,
            ]);
        }
        else{
            return Inertia::render('Profile/Edit', [
                'personal' => $personal,
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
}
