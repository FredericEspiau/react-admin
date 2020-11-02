import { Translate } from '../../types';
import { useTranslate } from '../../i18n';
import {
    useEditController,
    EditProps,
    EditControllerProps,
} from './useEditController';
import { useResourceContext, useResourceDefinition } from '../../core';

interface EditControllerComponentProps extends EditControllerProps {
    translate: Translate;
}

interface Props extends EditProps {
    children: (params: EditControllerComponentProps) => JSX.Element;
}

/**
 * Render prop version of the useEditController hook
 *
 * @see useEditController
 * @example
 *
 * const EditView = () => <div>...</div>
 * const MyEdit = props => (
 *     <EditController {...props}>
 *         {controllerProps => <EditView {...controllerProps} {...props} />}
 *     </EditController>
 * );
 */
export const EditController = ({ children, ...props }: Props) => {
    const { resource } = useResourceContext(props);
    const { hasCreate, hasEdit, hasList, hasShow } = useResourceDefinition(
        resource,
        props
    );
    // @deprecated. hasCreate, hasEdit, hasList and hasShow are injected for backward compatibility
    const controllerProps = useEditController({
        resource,
        hasCreate,
        hasEdit,
        hasList,
        hasShow,
        ...props,
    });
    // @deprecated. injected for backward compatibility
    const translate = useTranslate();
    return children({ translate, ...controllerProps });
};
