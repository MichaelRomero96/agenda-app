
import { Todo } from '../../components/Todo/types';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

function lightAndDarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
     {/*  {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />} */}
     <span>icon</span>
    </ActionIcon>
  );
}


export default lightAndDarkMode