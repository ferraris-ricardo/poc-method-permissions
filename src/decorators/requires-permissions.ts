import { ForbiddenException } from "@nestjs/common";
import { sessionContext } from "src/context/user-session";

export function RequiresPermissions(permissions: string[]) {
    return function(obj: any, methodName: string, methodDescriptor: TypedPropertyDescriptor<Function>) {
        const originalMethod = methodDescriptor.value;
        methodDescriptor.value = function() {
            const existingPermissions = sessionContext.get('permissions');
            const hasAllPermissions = permissions.every((p) => existingPermissions.includes(p));
            if (!hasAllPermissions) {
                throw new ForbiddenException(`User does not have all required permissions`)
            } else {
                return originalMethod.apply(this, arguments);
            }
        }
    }
}

