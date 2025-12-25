interface ApodErrorResponseProps {
    message: string;
}

export const ApodErrorResponse = ({ message }: ApodErrorResponseProps) => {
    return (
        <div style={{
            padding: '20px',
            margin: '20px 0',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            color: '#c33'
        }}>
            <h3>Error Loading APOD</h3>
            <p>{message}</p>
        </div>
    );
};
