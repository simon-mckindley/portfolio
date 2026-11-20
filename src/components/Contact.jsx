import { useEffect, useState } from 'react';

const CONTACT_DATA = [
    { name: 'email', label: 'Email', href: 'mailto:simonmckindley@gmail.com', link: 'simonmckindley@gmail.com', blank: false },
    { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/simon-mckindley/', link: 'linkedin.com/in/simon-mckindley', blank: true },
    { name: 'github', label: 'GitHub', href: 'https://github.com/simon-mckindley', link: 'github.com/simon-mckindley', blank: true },
];

export default function Contact(select = "") {
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        setSelectedValue(select);
    }, [select]);

    const handleRadioClick = (value) => {
        setSelectedValue(selectedValue === value ? "" : value);
    };

    return (
        <>
            <h3 className="card-heading">Contact me</h3>
            <ul className="contact-list">
                {CONTACT_DATA.map((contact, i) => (
                    <li key={i} className="contact-item">
                        <input
                            type="radio"
                            name="contact"
                            id={`contact-${contact.name}`}
                            value={contact.name}
                            checked={selectedValue === contact.name}
                            onClick={() => handleRadioClick(contact.name)}
                            onChange={() => { }}
                        />

                        <label htmlFor={`contact-${contact.name}`}>{contact.label}</label>
                    </li>
                ))}
            </ul>

            <div className="link-container">
                {CONTACT_DATA.map((contact, i) => (
                    <a
                        key={i}
                        className={`contact-address ${selectedValue === contact.name ? "show" : ""}`}
                        href={contact.href}
                        target={contact.blank ? '_blank' : ''}
                    >
                        {contact.link}
                    </a>
                ))}
            </div>
        </>
    );
}