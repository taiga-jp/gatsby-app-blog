import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from "../components/seo"
import "../css/contact.css"
import Button from '@material-ui/core/Button';

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" />
    <h1 className="contact-title">お問い合わせ</h1>
    <form
      className="contact-form"
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
    <input type="hidden" name="form-name" value="contact" />
    <input type="hidden" name="bot-field" />

      <div className="form-group">
        <label><span>お名前</span><abbr title="required">*</abbr>
        <input type="text" className="form-control" id="name" name="name" placeholder="" maxlength="30" minlength="2" required autocomplete="name" />
        </label>
      </div>
      <div className="form-group">
        <label><span>メールアドレス</span><abbr title="required">*</abbr>
        <input type="email" className="form-control" id="email" name="email" placeholder="" pattern="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" required autocomplete="email" />
        </label>
      </div>
      <div className="form-group">
        <label><span>お問い合わせ内容</span><abbr title="required">*</abbr>
        <textarea className="form-control" id="contact" name="content" rows="8" required></textarea>
        </label>
      </div>

      <div className="form-group-btn">
        <Button variant="contained" type="submit">送信</Button>
      </div>
    </form>
  </Layout>
)

export default ContactPage