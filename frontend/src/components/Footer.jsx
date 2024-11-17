import React from "react";
import "../styles/footer.css"

function Footer (){
  return(
    <footer className="footer">
      <div className="footer_info">
        <a className="a-footer" href="https://github.com/Los-Chavales/Proyecto-Grafos-" target="_blank">Repositorio Github</a>
        <address className="address-footer">
          <p>
            © 
            <a className="a-footer" href="https://github.com/DarthNeo03" target="_blank">JSGC, </a>
            <a className="a-footer" href="https://github.com/PaolaMarcano" target="_blank">PVMS, </a> 
            <a className="a-footer" href="https://github.com/Crisangelly" target="_blank">CVHF, </a>
            <a className="a-footer" href="https://github.com/teranMoises"  target="_blank">MATR </a> 
          </p>
        </address>
      </div>
    </footer>
  );
}

export default Footer;