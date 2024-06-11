export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm error_msg ' + className}>
            {message}
        </p>
    ) : null;
}
