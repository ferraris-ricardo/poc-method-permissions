import { NestMiddleware } from "@nestjs/common";
import { sessionContext } from "src/context/user-session";

export class PermissionsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: Error | any) => void) {
        sessionContext.run(() => {
            next();
        });
    }
}