import { Prisma } from '@prisma/client';
import { prisma } from '../seed';

const NAME = 'LocationStates';

const ITEMS: Prisma.LocationStateCreateInput[] = `
Alabama--AL
Kentucky--KY
Ohio--OH
Alaska--AK
Louisiana--LA
Oklahoma--OK
Arizona--AZ
Maine--ME
Oregon--OR
Arkansas--AR
Maryland--MD
Pennsylvania--PA
American Samoa--AS
Massachusetts--MA
Puerto Rico--PR
California--CA
Michigan--MI
Rhode Island--RI
Colorado--CO
Minnesota--MN
South Carolina--SC
Connecticut--CT
Mississippi--MS
South Dakota--SD
Delaware--DE
Missouri--MO
Tennessee--TN
District of Columbia--DC
Montana--MT
Texas--TX
Florida--FL
Nebraska--NE
Trust Territories--TT
Georgia--GA
Nevada--NV
Utah--UT
Guam--GU
New Hampshire--NH
Vermont--VT
Hawaii--HI
New Jersey--NJ
Virginia--VA
Idaho--ID
New Mexico--NM
Virgin Islands--VI
Illinois--IL
New York--NY
Washington--WA
Indiana--IN
North Carolina--NC
West Virginia--WV
Iowa--IA
North Dakota--ND
Wisconsin--WI
Kansas--KS
Northern Mariana Islands--CM
Wyoming--WY
`
  .split('\n')
  .filter((item) => item !== '')
  .map((item) => {
    const [state, abbreviation] = item.split('--');
    return {
      displayText: state,
      slug: abbreviation,
    };
  });

const main = async () => {
  console.info(`Seeding ${NAME}`);
  const promises = ITEMS.map((item) => {
    return prisma.locationState.upsert({
      create: item,
      update: { ...item },
      where: { slug: item.slug },
    });
  });
  await Promise.all(promises);
  console.info(`Done seeding ${NAME}`);
};

export default main;
