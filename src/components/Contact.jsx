import { useState } from 'react';

export default function Contact() {
    const contactData = [
        { name: 'email', label: 'Email', href: 'mailto:simonmckindley@gmail.com', link: 'simonmckindley@gmail.com', blank: false },
        { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/simon-mckindley/', link: 'linkedin.com/in/simon-mckindley', blank: true },
        { name: 'github', label: 'GitHub', href: 'https://github.com/simon-mckindley', link: 'github.com/simon-mckindley', blank: true },
    ];

    const [selectedValue, setSelectedValue] = useState("");

    const handleRadioClick = (value) => {
        if (selectedValue === value) {
            setSelectedValue("");
        } else {
            setSelectedValue(value);
        }
    };

    return (
        <>        
            <h3 className="card-heading">Contact me</h3>
            <ul className="contact-list">
                {contactData.map((contact, i) => (
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
                {contactData.map((contact, i) => (
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