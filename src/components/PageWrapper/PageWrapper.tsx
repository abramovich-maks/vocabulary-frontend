import React, {ReactNode} from 'react';

import {Footer} from '../Footer/Footer';
import {Navbar} from '../Navbar/Navbar';
import {ContentWrapper, Wrapper} from './PageWrapper.styles';

interface Props {
    children: ReactNode;
    toggleTheme: any;
    theme: any;
}

export const PageWrapper = ({children, toggleTheme, theme}: Props) => {
    return (
        <Wrapper>
            <Navbar toggleTheme={toggleTheme} theme={theme}/>

            <ContentWrapper>
                {children}
            </ContentWrapper>

            <Footer/>
        </Wrapper>
    );
};
