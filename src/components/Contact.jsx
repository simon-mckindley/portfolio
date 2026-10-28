
export default function Contact({ showContact = false }) {

    return (
        <div className="contact">            
            <ul className={`bento-card contact-card ${showContact ? "show" : ""}`}>
                <h3 className="card-heading">Contact me</h3>
                <li>
                    <a className="contact-item" href="mailto:simonmckindley@gmail.com">
                        <span className="label">Email</span>
                        <span className="contact-address">simonmckindley@gmail.com</span>
                    </a>
                </li>
                <li>
                    <a className="contact-item" href="https://www.linkedin.com/in/simon-mckindley/" target="_blank">
                        <span className="label">LinkedIn</span>
                        <span className="contact-address">linkedin.com/in/simon-mckindley</span>
                    </a>
                </li>
                <li>
                    <a className="contact-item" href="https://github.com/simon-mckindley" target="_blank">
                        <span className="label">GitHub</span>
                        <span className="contact-address">github.com/simon-mckindley</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}