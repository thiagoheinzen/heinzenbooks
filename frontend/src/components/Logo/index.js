import logo from '../../images/logo.png';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  font-size: 30px;
`

const LogoImage = styled.img`
  margin-right: 10px;
  transform: scale(0.9);
`;

function Logo() {
    return (
        <LogoContainer>
          <LogoImage 
            src={logo} 
            alt='HeinzenBooks Logo'
          />
        </LogoContainer>
    )
}

export default Logo;
