import { CanActivate, ExecutionContext, NestMiddleware } from "@nestjs/common";
import { Observable } from "rxjs";
import { getNamespace } from 'cls-hooked';
import { Request } from 'express';
import { sessionContext } from "src/context/user-session";

const tokensToPermissions = {
    "fake-token-one": ["users:read", "orders:read"],
    "fake-token-two": ["users:write", "orders:write"]
}

export class UserAuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const tokenValue = request.headers['authorization'];
        const permissions = tokensToPermissions[tokenValue];
        if (!permissions) return false;
        sessionContext.set('permissions', permissions);

        return true;
    }
}