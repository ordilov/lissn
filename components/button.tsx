function Button({id, inner, onClick}: { id: string, inner: any, onClick: any}) {
    return <button id={id} type="button" className="btn btn-default" onClick={onClick}>
        {inner}
    </button>;
}

export default Button;