import React from 'react'
class MicroFrontendErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error or perform any additional actions here
        console.error('Error in microfrontend:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Sorry, Microfrontend is not available right now.</div>;
        }

        return this.props.children;
    }
}
export default MicroFrontendErrorBoundary