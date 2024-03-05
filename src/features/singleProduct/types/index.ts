type AttributeKey = string;
type AttributeValue = string;

export type GroupedAttributes = {
	[key: AttributeKey]: AttributeValue[];
};

export type Attribute = {
	key: string;
	value: string;
};
