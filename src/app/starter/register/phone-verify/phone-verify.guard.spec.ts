import {TestBed} from '@angular/core/testing';

import {PhoneVerifyGuard} from './phone-verify.guard';

describe('PhoneVerifyGuard', () => {
    let guard: PhoneVerifyGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(PhoneVerifyGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
