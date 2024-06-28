import { LinkButton } from "../components/LinkButton";

export const MainPage = () => {


    return (
        <div className="wrapper">
                <div className="registration-error">
                    <h1 className="title">It's impossible to use a chat without registration!</h1>
                    <LinkButton to="registration" title="Sign in" />
                    <p className="title-description">Already have an account? <a href='/login'>Log in!</a></p>
                </div>
        </div>
    );
}

