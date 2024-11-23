import { JsonController, Get, Req, Res, UseBefore, UseAfter } from "routing-controllers";
import { Service } from "typedi";
import passport, { use } from "passport";
import { Request, Response } from "express";

@Service()
@JsonController("/auth")
export class AuthController {

    @Get()
    async test(@Req() req: any, @Res() res: any) {
        return res.send("<a href='/api/v1/auth/google'>Login with google</a>");
    }

    @Get('/google')
    @UseBefore(passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: true
    }))
    async googleAuth() {
        // This is handled by passport
    }

    @Get('/google/callback')
    async googleCallback(@Req() req: Request, @Res() res: Response) {
        return new Promise((resolve, reject) => {
            passport.authenticate('google', {
                failureRedirect: '/login',
                session: true
            }, (err: any, user: any) => {
                if (err) {
                    console.error('Authentication Error:', err);
                    return res.redirect('/login?error=' + encodeURIComponent(err.message));
                }
                if (!user) {
                    return res.redirect('/login?error=authentication_failed');
                }
                req.logIn(user, (err) => {
                    if (err) {
                        console.error('Login Error:', err);
                        return res.redirect('/login?error=' + encodeURIComponent(err.message));
                    }
                    return res.redirect('/api/v1/test/private');
                });
            })(req, res);
        });
    }

    @Get('/logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        req.logout((err) => {
            if (err) {
                console.error('Logout Error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error during logout',
                    error: err.message
                });
            }
            res.redirect('/login');
        });
    }
}