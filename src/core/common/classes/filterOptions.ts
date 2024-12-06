import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDefined,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ComparisonTypes } from 'src/core/types/comparisonTypes.enum';
import { In, LessThan, MoreThan } from 'typeorm';

class FilterCondition {
    @IsDefined()
    value: string | string[] | number | number[];
    @IsEnum(ComparisonTypes)
    comparison: ComparisonTypes;
}

class FilterOptions {
    @IsString()
    fieldName: string;
    @IsBoolean()
    @IsOptional()
    returning?: boolean;
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => FilterCondition)
    condition?: FilterCondition;
}

export class ExportFilter {
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => FilterOptions)
    fields: FilterOptions[];

    public getSelectedFields(): string[] {
        return this.fields
            .filter((field) => field.returning)
            .map((field) => field.fieldName);
    }

    public getWhereConditions(): {
        [x: string]: any;
    }[] {
        return this.fields
            .filter((field) => field.condition)
            .map((field) => {
                return {
                    [field.fieldName]: this.addComparison(
                        field.condition.value,
                        field.condition.comparison,
                    ),
                };
            });
    }

    private addComparison(value: any, comparison: string) {
        switch (comparison) {
            case ComparisonTypes.Bigger:
                return MoreThan(value);
            case ComparisonTypes.Smaller:
                return LessThan(value);
            case ComparisonTypes.Equals:
                return value;
            case ComparisonTypes.In:
                return In(value);
        }
    }
}
