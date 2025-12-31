const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
