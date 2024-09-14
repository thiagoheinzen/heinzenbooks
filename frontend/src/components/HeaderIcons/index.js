import profile from '../../images/profile.svg';
import bag from '../../images/bag.svg';
import styled from 'styled-components';

const Icons = styled.ul`
  display: flex;
  align-items: center;
`
const Icon = styled.li`
  margin-right: 40px;
  width: 25px;
`

const icons = [profile, bag];

function HeaderIcons() {
    return (
        <Icons>
            {icons.map((icon) => (
              <Icon key={icon}><img src={icon} alt="Icon"></img></Icon>
            ))}
        </Icons>
    )
}

export default HeaderIcons;
