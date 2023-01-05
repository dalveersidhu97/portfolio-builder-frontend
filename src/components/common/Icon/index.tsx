import * as Fa from 'react-icons/fa';
import * as Bs from 'react-icons/bs';
import * as Ai from 'react-icons/ai';
import * as Bi from 'react-icons/bi';
import * as Cg from 'react-icons/cg';
import * as Ci from 'react-icons/ci';
import * as Di from 'react-icons/di';
import * as Fc from 'react-icons/fc';
import * as Fi from 'react-icons/fi';
import * as Gi from 'react-icons/gi';
import * as Go from 'react-icons/go';
import * as Gr from 'react-icons/gr';
import * as Hi from 'react-icons/hi';
import * as Hi2 from 'react-icons/hi2';
import * as Im from 'react-icons/im';
import * as Io from 'react-icons/io';
import * as Io5 from 'react-icons/io5';
import * as Md from 'react-icons/md';
import * as Si from 'react-icons/si';
import * as Vs from 'react-icons/vsc';

const Icons = {...Fa, ...Bs, ...Ai, ...Bi, ...Cg, ...Ci, ...Di, ...Fc, ...Fi, ...Gi, ...Go, ...Gr, ...Hi, ...Hi2, ...Im, ...Io, ...Io5, ...Md, ...Si, ...Vs};
type IconName = keyof typeof Icons;

export const Icon = ({name, size = 26, withError}: { name: IconName, size?: string | number, withError?:boolean }) => {
    try {
        const IconComponent = Icons[name];
        if (typeof IconComponent === 'function')
            return IconComponent({ size })
        else return withError ? <span>Invalid Icon</span>: <></>
    }catch(e) {
        return withError ? <span>Invalid Icon</span>: <></>
    }
}