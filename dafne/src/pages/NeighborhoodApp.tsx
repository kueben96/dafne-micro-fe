import React, { useEffect, useRef } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mount } from 'neighborhood/NeighborhoodApp'
import PageHeader from '../components/PageHeader';
import { ContentPaper } from '../assets/theme/dafneStyles';
import { Container } from '@mui/system';
import { useNotification } from '../useNotification';

const NeighborhoodApp = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { displayNotification } = useNotification()


    useEffect(() => {
        if (ref.current) {
            mount(ref.current);
            // add an empty dependency array to only call this function when the marketing object is first rendered to the screen
        }
    }, []);

    // Add an event listener to capture the jobCreated event
    // Add an event listener to capture the jobCreated event
    useEffect(() => {
        const handleJobCreated = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail) {
                console.log('Job Created:', customEvent.detail, customEvent.detail);
                displayNotification(
                    {
                        type: customEvent.detail.type,
                        header: customEvent.detail.header,
                        message: customEvent.detail.message,
                        timeout: 10000,
                    }
                )
            }
        };

        window.addEventListener('neighborhood', handleJobCreated);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('neighborhood', handleJobCreated);
        };
    }, []);


    return (
        <>
            <PageHeader title='Neighborhood Generation'
                subtitle='Generate a synthetic city plan' />
            <ContentPaper>
                <Container>
                    <div ref={ref}></div>;
                </Container>
            </ContentPaper>


        </>
    )

}

export default NeighborhoodApp