import { render } from 'vitest-browser-react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import MyAccountPage, { MyAccountPageParameters } from './page';
import { myAccountsService } from '@/services/app/my-accounts.service';
import * as models from "@/types/app/my-accounts/page";
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/services/app/my-accounts.service', () => ({
    myAccountsService: {
        getAccount: vi.fn(),
    },
}));

const getAccount = vi.mocked(myAccountsService.getAccount);

describe('MyAccountDetailsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders correctly', async () => {
        let resolveData: (value: models.AccountDetails) => void = () => undefined;
        getAccount.mockReturnValue(new Promise(resolve => {
            resolveData = resolve;
        }));
        resolveData({id: '2', name: 'TEST_ACCOUNT', balance: 1000, currency: 'USD', type: 'checking'});
        const params: Promise<MyAccountPageParameters> = Promise.resolve({ accountId: '2' });
        const screen = await render(<NextIntlClientProvider locale='en'><MyAccountPage params={ params } /></NextIntlClientProvider>);
        const element = await screen.locator.getByText('TEST_ACCOUNT');
        expect(element.elements().length).toBe(2);
    });
});
