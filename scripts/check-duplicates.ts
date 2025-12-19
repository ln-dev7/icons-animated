import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { HUGEICONS_ICON_LIST } from '@/icons/hugeicons';
import { PHOSPHOR_ICON_LIST } from '@/icons/phosphor';
import { TABLER_ICON_LIST } from '@/icons/tabler';

type DuplicateEntry = {
  name: string;
  indexes: number[];
};

type DuplicateReport = {
  duplicateNames: DuplicateEntry[];
  totalDuplicates: number;
};

type IconListItem = {
  name: string;
  icon: ForwardRefExoticComponent<
    { size?: number; className?: string } & RefAttributes<unknown>
  >;
  keywords: string[];
};

const checkDuplicates = (iconList: IconListItem[]): DuplicateReport => {
  const nameIndexes = new Map<string, number[]>();

  for (let i = 0; i < iconList.length; i++) {
    const item = iconList[i];

    const indexes = nameIndexes.get(item.name) || [];
    indexes.push(i);
    nameIndexes.set(item.name, indexes);
  }

  const duplicateNames: DuplicateEntry[] = [];
  for (const [name, indexes] of nameIndexes) {
    if (indexes.length > 1) {
      duplicateNames.push({ name, indexes });
    }
  }

  return {
    duplicateNames,
    totalDuplicates: duplicateNames.length,
  };
};

const printReport = () => {
  let hasErrors = false;

  // Check Huge Icons
  console.log('🔍 Checking for duplicates in HUGEICONS_ICON_LIST...');
  console.log(`   Total icons: ${HUGEICONS_ICON_LIST.length}`);
  const hugeiconsReport = checkDuplicates(
    HUGEICONS_ICON_LIST as unknown as IconListItem[]
  );

  if (hugeiconsReport.duplicateNames.length > 0) {
    console.log('❌ DUPLICATE NAMES FOUND:');
    for (const { name, indexes } of hugeiconsReport.duplicateNames) {
      console.log(`   name: "${name}" - appears ${indexes.length} times`);
    }
    hasErrors = true;
  } else {
    console.log('✅ No duplicate names found\n');
  }

  // Check Tabler icons
  console.log('🔍 Checking for duplicates in TABLER_ICON_LIST...');
  console.log(`   Total icons: ${TABLER_ICON_LIST.length}`);
  const tablerReport = checkDuplicates(
    TABLER_ICON_LIST as unknown as IconListItem[]
  );

  if (tablerReport.duplicateNames.length > 0) {
    console.log('❌ DUPLICATE NAMES FOUND:');
    for (const { name, indexes } of tablerReport.duplicateNames) {
      console.log(`   name: "${name}" - appears ${indexes.length} times`);
    }
    hasErrors = true;
  } else {
    console.log('✅ No duplicate names found\n');
  }

  // Check Phosphor icons
  console.log('🔍 Checking for duplicates in PHOSPHOR_ICON_LIST...');
  console.log(`   Total icons: ${PHOSPHOR_ICON_LIST.length}`);
  const phosphorReport = checkDuplicates(
    PHOSPHOR_ICON_LIST as unknown as IconListItem[]
  );

  if (phosphorReport.duplicateNames.length > 0) {
    console.log('❌ DUPLICATE NAMES FOUND:');
    for (const { name, indexes } of phosphorReport.duplicateNames) {
      console.log(`   name: "${name}" - appears ${indexes.length} times`);
    }
    hasErrors = true;
  } else {
    console.log('✅ No duplicate names found\n');
  }

  if (hasErrors) {
    process.exit(1);
  }
};

printReport();
