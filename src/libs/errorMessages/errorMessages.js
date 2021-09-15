import { createToast } from "vercel-toast";
import "./errorMessages.css";


const messageError = (text, delay = 5000) => createToast(text, {
	timeout: delay,
	type: 'error'
});

export {
	messageError
}

