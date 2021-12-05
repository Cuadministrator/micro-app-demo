import Base, { config as base } from './Base/Index'
import MpList, { config as mpList } from './AmpList/Index'

const Index = {
  route: {
    Base,
    MpList,
  },
  config: {
    base,
    mpList,
  },
}

export default Index
