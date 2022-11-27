import { actions } from "../App";

const OperationButton = ({ operation, dispatch}) => {
    return (
        <button
            onClick={() => dispatch({
                type: actions.CHOOSE_OPERATION,
                payload: {operation}
        })}
        >
            {operation}
        </button>
    )
}

export default OperationButton;