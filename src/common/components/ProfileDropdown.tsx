import Auth from '@/common/context/AuthContext';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { ReactNode } from 'react';

export default function ProfileDropdown({ children }: { children: ReactNode }) {
    const auth = Auth.useAuth();

    return (
        <Dropdown>
            <DropdownTrigger>{children}</DropdownTrigger>
            <DropdownMenu>
                <DropdownSection>
                    <DropdownItem key="new">Account</DropdownItem>
                    <DropdownItem key="copy">Copy Session ID</DropdownItem>
                    <DropdownItem key="edit">Order History</DropdownItem>
                </DropdownSection>
                <DropdownSection>
                    <DropdownItem key="delete" className="text-danger" color="danger" onClick={auth.logout}>
                        Log out
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
